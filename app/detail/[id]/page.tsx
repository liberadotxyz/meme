// app/detail/[id]/page.tsx

import TokenHeader from "@/components/detalpage/TreadingHeader";
import TradingPanel from "@/components/detalpage/TradingPanel";
import { getDetail } from "@/api/topToken";

interface MyTokenPageProps {
  params: {
    id: string;
  };
}

const getTokenDetail = async (id: any) => {
  try {
    const { data } = await getDetail(id);
    return data || null;
  } catch (error) {
    console.error("Error fetching token detail:", error);
    return null;
  }
};

export default async function TokenDetailPage({ params }: any) {
  const tokenData = await getTokenDetail(params.id);

  if (!tokenData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Token data not found for ID: {params.id}
      </div>
    );
  }

  const { token_detail, token_stats } = tokenData;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6 bg-card border-none">
          <TokenHeader token={token_detail} stats={token_stats} />
          <TradingPanel token={token_detail} stats={token_stats} />
        </div>
      </div>
    </div>
  );
}
