import { RequestStatus } from '@utils-types';
import userSlice, {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './userSlice';

const initialState = {
  user: null,
  isAuthChecked: false,
  status: RequestStatus.Idle
};

const mockUser = {
  email: 'user@user.com',
  name: 'user'
};

describe('тесты userSlice', () => {
  it('userSlice loginUser rejected', async () => {
    const state = userSlice.reducer(initialState, {
      type: loginUser.rejected.type,
      payload: mockUser
    });

    expect(state).toEqual({
      user: null,
      isAuthChecked: true,
      status: RequestStatus.Failed
    });
  });

  it('userSlice  loginUser loading', async () => {
    const state = userSlice.reducer(initialState, {
      type: loginUser.pending.type,
      payload: mockUser
    });

    expect(state).toEqual({
      user: null,
      isAuthChecked: false,
      status: RequestStatus.Loading
    });
  });

  it('userSlice loginUser fulfilled', async () => {
    const state = userSlice.reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: mockUser
    });

    expect(state).toEqual({
      user: mockUser,
      isAuthChecked: true,
      status: RequestStatus.Success
    });
  });

  it('userSlice logoutUser rejected', async () => {
    const state = userSlice.reducer(initialState, {
      type: logoutUser.rejected.type,
      payload: mockUser
    });

    expect(state).toEqual({
      user: null,
      isAuthChecked: true,
      status: RequestStatus.Failed
    });
  });

  it('userSlice  logoutUser loading', async () => {
    const state = userSlice.reducer(initialState, {
      type: logoutUser.pending.type,
      payload: mockUser
    });

    expect(state).toEqual({
      user: null,
      isAuthChecked: false,
      status: RequestStatus.Loading
    });
  });

  it('userSlice logoutUser fulfilled', async () => {
    const state = userSlice.reducer(initialState, {
      type: logoutUser.fulfilled.type,
      payload: mockUser
    });

    expect(state).toEqual({
      user: null,
      isAuthChecked: true,
      status: RequestStatus.Success
    });
  });

  it('userSlice getUser rejected', async () => {
    const state = userSlice.reducer(initialState, {
      type: getUser.rejected.type,
      payload: mockUser
    });

    expect(state).toEqual({
      user: null,
      isAuthChecked: true,
      status: RequestStatus.Failed
    });
  });

  it('userSlice  getUser loading', async () => {
    const state = userSlice.reducer(initialState, {
      type: getUser.pending.type,
      payload: mockUser
    });

    expect(state).toEqual({
      user: null,
      isAuthChecked: false,
      status: RequestStatus.Loading
    });
  });

  it('userSlice getUser fulfilled', async () => {
    const state = userSlice.reducer(initialState, {
      type: getUser.fulfilled.type,
      payload: { user: mockUser }
    });

    expect(state).toEqual({
      user: mockUser,
      isAuthChecked: true,
      status: RequestStatus.Success
    });
  });
  it('userSlice registerUser rejected', async () => {
    const state = userSlice.reducer(initialState, {
      type: registerUser.rejected.type,
      payload: mockUser
    });

    expect(state).toEqual({
      user: null,
      isAuthChecked: true,
      status: RequestStatus.Failed
    });
  });

  it('userSlice  registerUser loading', async () => {
    const state = userSlice.reducer(initialState, {
      type: registerUser.pending.type,
      payload: mockUser
    });

    expect(state).toEqual({
      user: null,
      isAuthChecked: false,
      status: RequestStatus.Loading
    });
  });

  it('userSlice registerUser fulfilled', async () => {
    const state = userSlice.reducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: { user: mockUser }
    });

    expect(state).toEqual({
      user: mockUser,
      isAuthChecked: true,
      status: RequestStatus.Success
    });
  });

  it('userSlice updateUser rejected', async () => {
    const state = userSlice.reducer(initialState, {
      type: updateUser.rejected.type,
      payload: mockUser
    });

    expect(state).toEqual({
      user: null,
      isAuthChecked: true,
      status: RequestStatus.Failed
    });
  });

  it('userSlice  updateUser loading', async () => {
    const state = userSlice.reducer(initialState, {
      type: updateUser.pending.type,
      payload: mockUser
    });

    expect(state).toEqual({
      user: null,
      isAuthChecked: false,
      status: RequestStatus.Loading
    });
  });

  it('userSlice registerUser fulfilled', async () => {
    const state = userSlice.reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: { user: mockUser }
    });

    expect(state).toEqual({
      user: mockUser,
      isAuthChecked: true,
      status: RequestStatus.Success
    });
  });
});
