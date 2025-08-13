interface BalanceProp  {
    token_address:string,
    name:string,
    symbol:string,
    balance:string,
    logo:string,
    balance_formatted:string
}
export const WalletBalance = ({balance}:{balance:any}) => {
    const formattedBalance = Number(balance?.balance_formatted || 0).toFixed(3);

  return (
    <div className="text-center space-y-2">
      <h3 className="text-sm text-text-secondary">Total available balance</h3>
      <div className="text-5xl font-light">${formattedBalance}</div>
    </div>
  );
};