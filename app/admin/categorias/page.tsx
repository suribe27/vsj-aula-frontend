import { CategoryManager } from '@/features/categories/components/CategoryManager';
import { PageHeader } from '@/features/common/components/PageHeader';

export default function AdminCategoriesPage() {
  return (
    <>
      <PageHeader
        title="Categorías de apoyo"
        description="Agrupan los servicios. El enfoque define qué servicios se recomiendan según el riesgo."
      />
      <CategoryManager />
    </>
  );
}
