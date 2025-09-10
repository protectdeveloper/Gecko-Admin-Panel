import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useGetSupportUserTicketsQuery } from '@/api/Support/Support.hook';
import SupportListContent from './suppor-list-content';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SupportListProps {
  supportId?: string | null;
}

const SupportListClosed = ({ supportId }: SupportListProps) => {
  const router = useRouter();
  const pathname = usePathname() || '';
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const name = searchParams.get('name') || undefined;

  const [finished, setFinished] = useState(false);
  const [prevLength, setPrevLength] = useState<number>(0);

  const { data: ticketsData, isLoading } = useGetSupportUserTicketsQuery({
    pageNumber: Number(page),
    pageSize: Number(pageSize),
    subject: name,
    status: 'close'
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

  if (isLoading) {
    return (
      <Skeleton className="flex flex-col gap-2 w-full h-full bg-background">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex justify-between items-start bg-card rounded w-full p-3">
            <div className="flex-1 flex flex-col gap-3">
              <Skeleton className="w-3/4 h-3.5 rounded " />
              <Skeleton className="w-2/4 h-2.5 rounded " />
              <Skeleton className="w-14 h-5 rounded-xl " />
            </div>

            <Skeleton className="w-3 h-3 rounded-full " />
          </div>
        ))}
      </Skeleton>
    );
  }

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

export default SupportListClosed;
