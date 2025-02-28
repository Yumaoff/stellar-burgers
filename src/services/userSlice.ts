import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

interface User {
  email: string;
  name: string;
}

interface UserSlice {
  user: User | null;
  isAuthChecked: boolean;
  status: RequestStatus;
}

const initialState: UserSlice = {
  user: null,
  isAuthChecked: false,
  status: RequestStatus.Idle
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

export const getUser = createAsyncThunk('user/getApi', getUserApi);

export const logoutUser = createAsyncThunk('user/logoutUser', (_, {}) => {
  logoutApi()
    .then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
    })
    .catch(() => {
      console.log('Ошибка выполнения выхода');
    });
});

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    checkAuth: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = RequestStatus.Loading;
      state.isAuthChecked = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.status = RequestStatus.Failed;
      state.isAuthChecked = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = RequestStatus.Success;
      state.isAuthChecked = true;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.status = RequestStatus.Loading;
      state.isAuthChecked = false;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.status = RequestStatus.Failed;
      state.isAuthChecked = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.status = RequestStatus.Success;
      state.isAuthChecked = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.status = RequestStatus.Success;
      state.user = action.payload.user;
      state.isAuthChecked = true;
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.status = RequestStatus.Loading;
      state.isAuthChecked = false;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.status = RequestStatus.Failed;
      state.isAuthChecked = true;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.status = RequestStatus.Loading;
      state.isAuthChecked = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.status = RequestStatus.Failed;
      state.isAuthChecked = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = RequestStatus.Success;
      state.isAuthChecked = true;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.status = RequestStatus.Loading;
      state.isAuthChecked = false;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.status = RequestStatus.Failed;
      state.isAuthChecked = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = RequestStatus.Success;
      state.isAuthChecked = true;
    });
  },
  selectors: {
    userSliceSelector: (state) => state.user,
    checkAuthUser: (state) => state.isAuthChecked
  }
});

export const { checkAuth } = userSlice.actions;

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(checkAuth());
      });
    } else {
      dispatch(checkAuth());
    }
  }
);

export const { userSliceSelector, checkAuthUser } = userSlice.selectors;
export default userSlice;
