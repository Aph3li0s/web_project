import { Prisma } from "@prisma/client";
import { type SerializeFrom } from "@remix-run/node";
import Content from "../Content";
import { useContext, useState } from "react";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  QuestionDetailContext,
  QuestionDetailContextType,
} from "../QuestionDetail/Context";

export const questionSelect: Prisma.QuestionSelect = {
  id: true,
  content: true,
  user: {
    select: {
      id: true,
      name: true,
      avatarId: true,
    },
  },

  createdAt: true,
};

const questionWithUser = Prisma.validator<Prisma.QuestionDefaultArgs>()({
  select: questionSelect,
});

export type QuestionComponentType = SerializeFrom<
  Prisma.QuestionGetPayload<typeof questionWithUser>
>;

const Question = ({ question }: { question: QuestionComponentType }) => {
  const [currentQuestion] = useState(question);
  const { getAnswers } = useContext(
    QuestionDetailContext
  ) as QuestionDetailContextType;
  if (!currentQuestion) return <></>;
  return (
    <div className="flex flex-col w-full p-4 gap-2 border-b-[1px] border-gray-300">
      <Content content={currentQuestion} />
      <div className="flex flex-row items-center">
        <Button sx={{ border: 0, borderRadius: 0, width: "100%" }}>
          <FavoriteBorderIcon />
        </Button>
        <Button
          onClick={() => getAnswers(question.id)}
          sx={{ border: 0, borderRadius: 0, width: "100%" }}
        >
          <ChatBubbleOutlineIcon />
        </Button>
      </div>
    </div>
  );
};

export default Question;
