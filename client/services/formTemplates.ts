import { apiFetch } from "@/lib/api";

export type FormTemplate = {
  id: string;
  name: string;
  createdAt: string;
};

export const FormTemplates = {
  list: () => apiFetch<FormTemplate[]>("/api/form-templates"),
  create: (payload: { name: string }) =>
    apiFetch<FormTemplate>("/api/form-templates", {
      method: "POST",
      body: payload,
    }),
  update: (id: string, data: Partial<FormTemplate>) =>
    apiFetch<FormTemplate>(`/api/form-templates/${id}`, {
      method: "PUT",
      body: data,
    }),
  remove: (id: string) =>
    apiFetch<void>(`/api/form-templates/${id}`, { method: "DELETE" }),
};
