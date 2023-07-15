import { type MedicalComments, type NurseComments } from "@prisma/client";
import { type Dispatch, type SetStateAction } from "react";
import { convertDate } from "~/utils/dates";

interface TextAreaProps {
  commentsList: MedicalComments[] | NurseComments[] | null;
  handleClick: () => void;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
}

const TextArea = (props: TextAreaProps) => {
  const reverted = [...props.commentsList!].reverse();
  return (
    <div className="flex flex-col">
      <div>
        <textarea
          className="h-80 w-full whitespace-pre-line rounded-b-md border-none shadow-md focus:outline-0"
          value={props.comment}
          onChange={(e) => props.setComment(e.target.value)}
        />
        <button
          className=" float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-2 text-white"
          type="button"
          onClick={() => props.handleClick()}
        >
          Gravar
        </button>
      </div>
      <div>
        <div className="mt-8 flex w-full min-w-full max-w-screen-md flex-col justify-center gap-2 rounded-b-md bg-white shadow-md">
          {reverted ? (
            reverted.map((comm) => (
              <div key={comm.id}>
                <div className="flex w-full flex-grow justify-center gap-4 border-b ">
                  <span className="ml-2 w-1/2 whitespace-pre-line">
                    {comm.comment}
                  </span>
                  <span className="w-1/4 font-semibold">{comm.createdBy}</span>
                  <span className="w-1/4">{convertDate(comm.createdAt)}</span>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextArea;
