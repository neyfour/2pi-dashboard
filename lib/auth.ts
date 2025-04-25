// This is a mock implementation. In a real app, this would connect to a backend.

type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'seller' | 'teacher';
};

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResult = {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
};

// Mock user database
const users: User[] = [
  {
    id: '1',
    email: 'admin@2pi.ma',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'seller@2pi.ma',
    name: 'Seller User',
    role: 'seller',
  },
  {
    id: '3',
    email: 'teacher@2pi.ma',
    name: 'Teacher User',
    role: 'teacher',
  },
];

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResult> => {
  // In a real app, this would make an API request to validate credentials
  // and return a JWT token
  
  // For demonstration, we'll just check if the email exists in our mock database
  // and assume the password is correct (DO NOT DO THIS IN PRODUCTION)
  
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const user = users.find(user => user.email === credentials.email);
      
      if (user) {
        // In a real app, we would verify the password here
        const token = `mock-jwt-token-${Date.now()}`;
        
        // Store user in localStorage or with a proper state management solution
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
        }
        
        resolve({
          success: true,
          user,
          token,
        });
      } else {
        resolve({
          success: false,
          message: 'Invalid email or password',
        });
      }
    }, 1000);
  });
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const userJson = localStorage.getItem('user');
  if (!userJson) {
    return null;
  }
  
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const getUserRole = (): string | null => {
  const user = getCurrentUser();
  return user ? user.role : null;
};

export const logoutUser = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};