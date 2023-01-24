import React from "react";

function Modal({ show, setShow, data, type }) {
  return (
    <div>
      {show && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto min-w-[30%] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}

                {/*body*/}
                <div className="relative px-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    <div
                      className={`pt-2 pb-1 text-2xl ${
                        type == "success" ? "text-green-500" : "text-orange-400"
                      }`}
                    >
                      {data.heading}
                    </div>{" "}
                    {data.body}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end pb-4 rounded-b">
                  <button
                    className="text-slate-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShow(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
}

export default Modal;
