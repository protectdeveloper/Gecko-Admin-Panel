import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useGetSupportUserTicketsQuery } from '@/api/Support/Support.hook';
import { useState, useEffect } from 'react';
import SupportListContent from './suppor-list-content';

interface SupportListProps {
  supportId?: string | null;
}

const SupportListOpen = ({ supportId }: SupportListProps) => {
  const router = useRouter();
  const pathname = usePathname() || '';
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const name = searchParams.get('name') || undefined;

  const [finished, setFinished] = useState(false);
  const [prevLength, setPrevLength] = useState<number>(0);

  const { data: ticketsData } = useGetSupportUserTicketsQuery({
    pageNumber: Number(page),
    pageSize: Number(pageSize),
    subject: name,
    status: 'open'
  });

  const onChangeHandler = (value: string, queryName: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newSearchParams.set(queryName, value);
    } else {
      newSearchParams.delete(queryName);
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleLoadMore = () => {
    setPrevLength(ticketsData?.data?.length || 0);
    const newPageSize = Number(pageSize) + 20;
    onChangeHandler(newPageSize.toString(), 'pageSize');
  };

  useEffect(() => {
    if (prevLength > 0 && (ticketsData?.data?.length || 0) === prevLength) {
      setFinished(true);
    }
  }, [ticketsData?.data, prevLength]);

  return (
    <ScrollArea className="w-full h-full">
      <SupportListContent
        ticketsData={ticketsData}
        supportId={supportId}
        onChangeHandler={onChangeHandler}
        finished={finished}
        handleLoadMore={handleLoadMore}
      />
    </ScrollArea>
  );
};

export default SupportListOpen;
