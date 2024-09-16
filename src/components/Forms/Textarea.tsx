interface Props {
  label: string;
  rows?: number;
  name: string;
  value: string;
  handleChange: (e: any) => void;
  disabled?: boolean;
}

export default function Textarea({ props }: { props: Props }) {
  return (
    <div className="mb-4.5">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {props.label}
      </label>
      <textarea
        disabled={props.disabled}
        name={props.name}
        onChange={props.handleChange}
        value={props.value}
        rows={props.rows ?? 5}
        placeholder={`Tuliskan ${props.label}...`}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      ></textarea>
    </div>
  );
}
