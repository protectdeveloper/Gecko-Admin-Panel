export const formatPriceCurrency = (price: number) => {
  return price
    ?.toFixed(2)
    ?.replace('.', ',')
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
