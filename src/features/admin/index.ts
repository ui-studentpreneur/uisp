/**
 * Public surface of the `admin` feature. Route files render these and nothing
 * else; the server modules stay private to the slice.
 */
export { AdminShell } from "./components/admin-shell";
export { LoginForm } from "./components/login-form";
export { PageEditor } from "./components/page-editor";
export { PageIndex } from "./components/page-index";
export { loadPage, pageSummaries } from "./server/queries";
