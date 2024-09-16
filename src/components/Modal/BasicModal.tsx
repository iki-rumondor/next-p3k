interface Props {
  toggleModal: () => void;
}

export default function BasicModal({
  props,
  children,
}: {
  props: Props;
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        onClick={props.toggleModal}
      ></div>

      <div
        id="popup-modal"
        tabIndex={-1}
        className="fixed inset-0 z-2 flex items-center justify-center overflow-y-auto overflow-x-hidden h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={props.toggleModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
