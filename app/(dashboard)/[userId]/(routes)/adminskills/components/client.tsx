'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/ui/api-list';

import { columns, SkillColumn } from './columns';

interface SkillClientProps {
  data: SkillColumn[];
}

export const SkillClient: React.FC<SkillClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Skills (${data.length})`}
          description="Manage skills for your store"
        />
        <Button onClick={() => router.push(`/adminskills/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Skills" />
      <Separator />
      <ApiList entityName="skills" entityIdName="skillId" />
    </>
  );
};
