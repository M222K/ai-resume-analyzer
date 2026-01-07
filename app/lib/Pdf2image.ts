
export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let loadPromise: Promise<any> | null = null;

/**
 * Loads the PDF.js library and sets up the worker using a reliable CDN.
 */
async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    loadPromise = (async () => {
        try {
            // Import the main library
            const lib = await import("pdfjs-dist");
            
            // Use the local worker file from public folder
            lib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
            
            pdfjsLib = lib;
            return lib;
        } catch (error) {
            console.error("Error loading PDF.js:", error);
            throw error;
        }
    })();

    return loadPromise;
}

/**
 * Converts the first page of a PDF file into a high-quality PNG image.
 */
export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
    try {
        console.log("Starting PDF conversion for file:", file.name);
        const lib = await loadPdfJs();
        console.log("PDF.js loaded successfully");

        // Convert File to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        console.log("File converted to ArrayBuffer, size:", arrayBuffer.byteLength);
        
        // Load the PDF document
        const loadingTask = lib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        console.log("PDF document loaded, pages:", pdf.numPages);
        
        // Get the first page
        const page = await pdf.getPage(1);
        console.log("First page loaded");

        // Set scale (4 is high quality, 1-2 is standard)
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Canvas context could not be initialized.");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        console.log("Canvas created, size:", canvas.width, "x", canvas.height);

        // Render the page into the canvas
        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };

        await page.render(renderContext).promise;
        console.log("Page rendered to canvas");

        // Convert canvas to Blob then to File
        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    console.log("Canvas toBlob callback, blob:", blob);
                    if (blob) {
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });

                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to generate image blob from canvas.",
                        });
                    }
                },
                "image/png",
                0.9 // Quality setting
            );
        });
    } catch (err: any) {
        console.error("Conversion error:", err);
        return {
            imageUrl: "",
            file: null,
            error: err.message || "An unknown error occurred during PDF conversion.",
        };
    }
}