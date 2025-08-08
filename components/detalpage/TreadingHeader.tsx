import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Star, Share2, Eye } from "lucide-react";

const TokenHeader = () => {
  return (
    <div className="bg-surface-elevated border-b border-green-500 p-4 mb-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Token Logo and Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">D</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-semibold text-foreground">Deploy On GTZ</h1>
                <Badge variant="secondary" className="text-xs">DOK</Badge>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>$107.95K</span>
                <span className="text-trading-green">$0.0₃10</span>
                <span className="text-trading-green">+19.8%</span>
              </div>
            </div>
          </div>

          {/* Trading Metrics */}
          <div className="flex items-center space-x-6 ml-8">
            <div>
              <div className="text-xs text-muted-foreground">Liquidity</div>
              <div className="text-sm font-medium">$44K</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Holders</div>
              <div className="text-sm font-medium">981</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">DEX Audit</div>
              <div className="text-sm text-trading-green font-medium">DYOR</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
         
        </div>
      </div>

      {/* Sub Header */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-muted-foreground">GTZ/WETH on Uniswap v3 • 5 • moralis.com</span>
         
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <span>• Volume SMA</span>
          <span className="text-trading-green font-medium">228.42</span>
        </div>
      </div>
    </div>
  );
};



export default TokenHeader;