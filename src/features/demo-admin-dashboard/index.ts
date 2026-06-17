export { DemoAdminDashboard } from "./DemoAdminDashboard";
export { DemoAdminDashboard as DemoAdminLayoutDashboard } from "./components/DemoAdminDashboard";
export {
  ADMIN_DASHBOARD_MIN_SUPPORTED_WIDTH,
  getAdminDashboardBreakpoint,
  getAdminDashboardWidthNote,
  isAdminDashboardWidthSupported,
} from "./layout";

export {
  adminDashboardLayoutChecks,
  adminDashboardPanels,
  adminDashboardWidthNotes,
} from "./fixtures/demoData";

export { defaultCampaignSnapshots } from "./fixtures/campaignSnapshotFixtures";

export type {
  AdminDashboardBreakpoint,
  AdminDashboardLayoutCheck,
  AdminDashboardPanel,
  AdminDashboardWidthNote,
  DashboardNavItem,
  DashboardSection,
  DemoAdminDashboardProps,
  StatCard,
  PresetAttachment,
  PresetEvent,
} from "./types";

export type { CampaignSnapshot } from "./types/campaignSnapshot";

export {
  TemplatePicker,
  messageTemplates,
  searchTemplates,
  templateToDraft,
  isTemplateInserted,
  insertTemplate,
  removeDraft,
  TEMPLATE_CATEGORY_LABEL,
  type InsertResult,
  type MessageTemplate,
  type TemplateCategory,
} from "./templates";
export * from "./validation-types";
export * from "./validation";
export * from "./validationFixtures";
export { ValidationResultsPanel } from "./ValidationResultsPanel";
export type { ValidationResultsPanelProps } from "./ValidationResultsPanel";
