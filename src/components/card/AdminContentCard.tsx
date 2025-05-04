import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContentType } from "@/enums";
import { useRedux } from "@/hooks/useRedux";
import { Content } from "@/interfaces";

interface AdminContentCardProps extends Content {
  onRequestDelete: (data: Content) => void;
  onRequestEdit: (data: Content) => void;
}

export const AdminContentCard = ({
  onRequestDelete,
  onRequestEdit,
  ...contentData
}: AdminContentCardProps) => {
  const { useStateSelector } = useRedux();

  const {
    _id,
    description,
    mediaUrl,
    type,
    updatedAt,
    coverArtUrl,
    createdAt,
  } = contentData;
  const { deletingContent } = useStateSelector((state) => state.Content);

  const requestEdit = () => {
    onRequestEdit(contentData);
  };

  const requestDelete = () => {
    onRequestDelete(contentData);
  };

  return (
    <div className="transparent-white rounded-md p-4 neue-regular relative max-w-[650px] md:max-w-[550px] flex-col flex">
      <div className="absolute top-0 right-0 z-30">
        <DropdownMenu>
          <DropdownMenuTrigger disabled={deletingContent}>
            <span
              className={`w-10 h-10 rounded-md grid place-items-center cursor-pointer`}
            >
              <i
                className={`text-white flex fi fi-rr-menu-dots-vertical text-base`}
              ></i>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black" align="end">
            <DropdownMenuItem
              className="cursor-pointer text-gray-300 hover:text-black focus:text-black"
              onClick={() => requestEdit()}
            >
              <span className="w-36 flex justify-between cursor-pointer">
                <span>Edit</span>
                <i className="fi fi-rr-pencil"></i>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-gray-300 hover:text-black focus:text-black"
              onClick={() => requestDelete()}
            >
              <span className="w-36 flex justify-between cursor-pointer">
                <span>Delete</span>
                <i className="fi fi-rr-trash-xmarkx"></i>
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full h-60 rounded-sm overflow-hidden transparent-white">
        {type === ContentType.AUDIO ? (
          <img
            src={coverArtUrl}
            alt={"Thumbnail"}
            className="w-full h-full object-contain"
          />
        ) : (
          <video src={mediaUrl} className="w-full h-full object-contain" />
        )}
      </div>
      <div className="blog-info w-full transparent-white mt-4 rounded-sm p-4 flex-1">
        <p className="text-gray-400 text-sm neue-regular font-normal">
          {description}
        </p>

        <hr className="my-3 border-gray-500" />
        <p className="text-gray-200 text-xs font-medium mt-4 neue-regular break-words">
          Added on
          <span className="text-gray-400 cursor-pointer neue-regular ml-2">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  );
};
