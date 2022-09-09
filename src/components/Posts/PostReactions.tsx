import { useAppDispatch } from '../../store/hooks';
import { updateReaction } from '../../store/postsSlice';

import { ReactionsType } from '../../store/postsSlice';

type IconTypes = {
  [name: string]: string;
};

const reactionsIcons: IconTypes = {
  like: '👍',
  wow: '🤩',
  love: '💝',
  top: '🚀',
  unlike: '👎',
};

type PostReactionsProps = {
  reactions: ReactionsType;
  postId: number;
};

const PostReactions: React.FC<PostReactionsProps> = ({ reactions, postId }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-2">
      {Object.entries(reactions).map((reaction) => (
        <div
          key={reactionsIcons[reaction[0] as keyof IconTypes]}
          className="flex gap-1"
        >
          <button
            onClick={() => {
              dispatch(updateReaction({ postId, reaction: reaction[0] }));
              console.log(postId);
            }}
          >
            {reactionsIcons[reaction[0] as keyof IconTypes]}
          </button>{' '}
          <p>{Number(reaction[1])}</p>
        </div>
      ))}
    </div>
  );
};

export default PostReactions;
