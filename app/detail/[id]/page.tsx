import TokenHeader from "@/components/detalpage/TreadingHeader";
import TradingPanel from "@/components/detalpage/TradingPanel";
import { getDetail } from "@/api/topToken";
interface Params {
  id: string;
}

interface Props {
  params: Params;
  searchParams?: Record<string, string | string[] | undefined>;
}
const getTokenDetail = async (id: string) => {
    try {
        const { data } = await getDetail(id);

        if (!data) {
            console.warn(`No data found for token ID: ${id}`);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error fetching token detail:", error);
        return null;
    }
};


export default async function TokenCreationForm({ params }: Props) {
    const { id } = params;
    const tokenData = await getTokenDetail(id);

    if (!tokenData) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">
            Token data not found for ID: {id}
        </div>;
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
