import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export type PriceChartProps = {
  priceHistory: [
    {
      price: string;
      date: string;
    }
  ];
};
export type PriceHistoryItem = {
  price: number;
  date: string;
};

const fallback = [
  { date: "01/01-22", price: 400 },
  { date: "01/01-22", price: 500 },
  { date: "01/01-22", price: 800 },
  { date: "01/01-22", price: 300 },
  { date: "01/01-22", price: 400 },
];
const PriceChart = ({ priceHistory }: PriceChartProps) => {
  const parsedPriceHistory: PriceHistoryItem[] = [];
  console.log(priceHistory);
  priceHistory.forEach(function (item) {
    const obj = { date: item.date, price: Number(item.price) };
    parsedPriceHistory.push(obj);
  });

  let data = priceHistory ? priceHistory : fallback;
  data = parsedPriceHistory;
  //data = fallback;
  return (
    <LineChart
      width={1000}
      height={500}
      data={data}
      className="mr-auto ml-auto mt-10"
    >
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default PriceChart;
