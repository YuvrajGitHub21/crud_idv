import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FormTemplates, FormTemplate } from "@/services/formTemplates";

export function useFormTemplates() {
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ["form-templates"],
    queryFn: FormTemplates.list,
  });

  const create = useMutation({
    mutationFn: FormTemplates.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["form-templates"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FormTemplate> }) =>
      FormTemplates.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["form-templates"] }),
  });

  const remove = useMutation({
    mutationFn: FormTemplates.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["form-templates"] }),
  });

  return { list, create, update, remove };
}
