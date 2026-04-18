// We explicitly define our central payload structure.
// This proves strong type-safety and guarantees consistent fields across
// multiple decoupled step components.
export interface FormData {
  firstName: string;
  lastName: string;
}
