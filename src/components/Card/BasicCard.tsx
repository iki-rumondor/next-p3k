interface Props {
  title: string;
  children: React.ReactNode;
}

export default function BasicCard({ title, children }: Props) {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}
