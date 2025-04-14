import { httpClient } from '../http/httpClient';
import { User } from '../types/user';

export const userService = {
  getUser: (): Promise<User> => httpClient.get('/'),
  changeName: (newName: string): Promise<User> => httpClient.patch('/changename',
    { name: newName}
  ),
  changePassword: (oldPassword: string, newPassword: string): Promise<User> => 
    httpClient.patch('/changepassword', { oldPassword, newPassword }),
  resetPasswordRequest: (email: string): Promise<User> => 
    httpClient.post('/resetpassword', { email }),
  resetPassword: (email: string, resetToken: string, newPassword: string) => 
    httpClient.patch(`/resetpassword/${email}/${resetToken}`, { newPassword }),
  changeEmail: (oldEmail: string, password: string, newEmail: string) =>
    httpClient.patch(`/changeemail/${oldEmail}`, { password, newEmail }), 
};
