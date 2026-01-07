import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { pathToFileURL } from "url";

export default [index("routes/home.tsx"),
    route("/auth","routes/auth.tsx"),
    route("/upload","routes/upload.tsx"),
    route("/resume/:id","routes/Resume.tsx"),
    route("/wipe","routes/wipe.tsx")
] satisfies RouteConfig;
