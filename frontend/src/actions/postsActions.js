import axios from "axios";
import {
  POSTS_CREATE_FAILURE,
  POSTS_CREATE_REQUEST,
  POSTS_CREATE_SUCCESS,
  POSTS_LIST_FAILURE,
  POSTS_LIST_REQUEST,
  POSTS_LIST_SUCCESS,
  POSTS_UPDATE_FAILURE,
  POSTS_UPDATE_SUCCESS,
  POSTS_UPDATE_REQUEST,
  POSTS_DELETE_FAILURE,
  POSTS_DELETE_SUCCESS,
  POSTS_DELETE_REQUEST,
} from "../constants/postsConstants";

export const listPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/posts`, config);

    dispatch({ type: POSTS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POSTS_LIST_FAILURE, payload: message });
  }
};

// Creates a new post for logged in user
export const createPostAction =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/posts/create`,
        { title, content, category },
        config
      );

      dispatch({
        type: POSTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSTS_CREATE_FAILURE,
        payload: message,
      });
    }
  };

// Edit posts
export const updatePostAction =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/posts/${id}`,
        { title, content, category },
        config
      );

      dispatch({
        type: POSTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POSTS_UPDATE_FAILURE,
        payload: message,
      });
    }
  };

// Delete posts
export const deletePostAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/posts/${id}`, config);

    dispatch({
      type: POSTS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: POSTS_DELETE_FAILURE,
      payload: message,
    });
  }
};