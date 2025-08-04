import { TokenCard } from "@/components/TokenCard";
import { TradingCard } from "@/components/TradingCard";
import { Card } from "@/components/ui/card";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen gap-3 ">
      {
        [1, 2, 3, 4, 5].map((item) => (
          <Card className="p-2 w-full max-w-3xl gap-0">
            <TradingCard
              tokenName="DAREALFNTRAP"
              tokenIcon={"/images/aaa.png"}
              price="0.06 ETH"
              marketCap="$1.14M"
              timestamp="26m"
            />
            <TokenCard
              name="SAILANA"
              symbol="Shiba Inu"
              icon={"/images/aaa.png"}
              marketCap="$1.13M"
              address="dWd8...BAGS"
              showBoost={true}
            />
          </Card>

        ))
      }

    </div>
  );
}
