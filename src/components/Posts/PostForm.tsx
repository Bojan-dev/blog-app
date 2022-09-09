import React, { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addNewPost, editPost } from '../../store/postsSlice';
import { useAppDispatch } from '../../store/hooks';
import { selectAllUsers } from '../../store/usersSlice';

const titleRegex = /^[A-Za-z0-9 _ !]*$/;

const checkTitleValidity = (title: string): boolean => {
  return title.length > 4 && titleRegex.test(title);
};

enum InputActionsName {
  VALUE = 'VALUE',
  VALIDITY = 'VALIDITY',
}

type ReducerState = {
  content: string;
  isContentValid: boolean;
};

interface FieldActionsValue {
  type: InputActionsName.VALUE;
  payload: string;
}

interface FieldActionValidity {
  type: InputActionsName.VALIDITY;
  payload: boolean;
}

type FieldActions = FieldActionsValue | FieldActionValidity;

const fieldReducer = (state: ReducerState, action: FieldActions) => {
  switch (action.type) {
    case InputActionsName.VALUE:
      return { ...state, content: action.payload };
    case InputActionsName.VALIDITY:
      return {
        ...state,
        isContentValid: action.payload,
      };
    default:
      return state;
  }
};

export type InitialStateProps = {
  contentTitle: string;
  contentBody: string;
  isContentValid: boolean;
  userId: number;
};

type ReducerFunctions = typeof addNewPost | typeof editPost;

type ChildProps = {
  initialValue: InitialStateProps;
  onSubmitFun: ReducerFunctions;
  postId?: number;
};

const PostForm: React.FC<React.PropsWithChildren<ChildProps>> = ({
  initialValue,
  onSubmitFun,
  postId = 0,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const users = useSelector(selectAllUsers);

  const [titleState, dispatchTitle] = useReducer(fieldReducer, {
    content: initialValue.contentTitle,
    isContentValid: initialValue.isContentValid,
  });
  const [bodyState, dispatchBody] = useReducer(fieldReducer, {
    content: initialValue.contentBody,
    isContentValid: initialValue.isContentValid,
  });
  const [user, setUser] = useState(initialValue.userId);
  const [isUserFocused, setIsUserFocused] = useState(false);

  const authorValidity = isFinite(user) && user > 0 && user <= users.length;

  const onFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      titleState.isContentValid &&
      bodyState.isContentValid &&
      authorValidity
    ) {
      const formInfo = {
        title: titleState.content,
        body: bodyState.content,
        userId: user,
      };

      if (onSubmitFun === addNewPost) dispatch(onSubmitFun({ ...formInfo }));

      if (onSubmitFun === editPost)
        dispatch(onSubmitFun({ ...formInfo, postId: postId }));

      navigate('/');
    } else {
      dispatchTitle({
        type: InputActionsName.VALIDITY,
        payload: checkTitleValidity(titleState.content),
      });
      dispatchBody({
        type: InputActionsName.VALIDITY,
        payload: bodyState.content.length > 9,
      });
      setIsUserFocused(true);
    }
  };

  return (
    <main className=" border w-[90vw] p-10 border-black sm:w-3/5 lg:w-1/3">
      <form>
        <div className="flex flex-col mb-5">
          <label className="text-lg mb-2 cursor-pointer " htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            onChange={(e) => {
              dispatchTitle({
                type: InputActionsName.VALUE,
                payload: e.target.value,
              });

              if (!titleState.isContentValid) {
                dispatchTitle({
                  type: InputActionsName.VALIDITY,
                  payload: checkTitleValidity(titleState.content),
                });
              }
            }}
            onBlur={() =>
              dispatchTitle({
                type: InputActionsName.VALIDITY,
                payload: checkTitleValidity(titleState.content),
              })
            }
            value={titleState.content}
            type="text"
            placeholder="Enter your title"
            className={`border outline-none rounded-md py-1.5 px-2 focus:border-black ${
              !titleState.isContentValid ? 'border-red-600' : ''
            }`}
          />
          {!titleState.isContentValid && (
            <p className="text-sm text-red-500 mt-2">
              Title must be at least 5 letters/numbers long.
            </p>
          )}
        </div>
        <div className="flex flex-col mb-5">
          <label className="text-lg mb-2 cursor-pointer" htmlFor="content">
            Content:
          </label>
          <textarea
            onChange={(e) => {
              dispatchBody({
                type: InputActionsName.VALUE,
                payload: e.target.value,
              });
              if (!bodyState.isContentValid)
                dispatchBody({
                  type: InputActionsName.VALIDITY,
                  payload: e.target.value.length > 9,
                });
            }}
            onBlur={(e) =>
              dispatchBody({
                type: InputActionsName.VALIDITY,
                payload: e.target.value.length > 9,
              })
            }
            value={bodyState.content}
            name="content"
            id="content"
            placeholder="Enter post content"
            className={`border outline-none rounded-md py-1.5 px-2 focus:border-black ${
              !bodyState.isContentValid ? 'border-red-600' : ''
            }`}
          ></textarea>
          {!bodyState.isContentValid && (
            <p className="text-sm text-red-500 mt-2">
              Post content bust be at least 10 characters long.
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-lg mb-2 cursor-pointer" htmlFor="authors">
            Select Author:
          </label>
          <select
            id="authors"
            name="authors"
            className={`border outline-none rounded-md py-1.5 px-2 focus:border-black ${
              !authorValidity && isUserFocused ? 'border-red-600' : ''
            }`}
            onChange={(e) => setUser(Number(e.target.value))}
            value={user}
            onFocus={() => setIsUserFocused(true)}
          >
            <option defaultValue={postId}>Select Author</option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {!authorValidity && isUserFocused && (
            <p className="text-sm text-red-500 mt-2">
              Please select an author.
            </p>
          )}
        </div>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            onFormSubmit(e)
          }
          className="mt-10 bg-second-blue text-white py-3 w-3/5 rounded-md m-auto lg:w-2/4"
        >
          {postId !== 0 ? 'Edit Post' : 'Add New Post'}
        </button>
      </form>
    </main>
  );
};

export default PostForm;
