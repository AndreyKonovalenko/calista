export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  VERIFY_PENDING: '/verify-pending',
  ERROR: '/error',
  NOT_FOUND: '/404',

  // User routes
  USER: {
    ROOT: '/user',
    PROFILE: '/user/profile',
    EMAIL: '/user/email',
    SECURITY: '/user/security',
  },

  // Dynamic route builders
  board: (boardId: string) => `/boards/${boardId}`,
  card: (boardId: string, listId: string, cardId: string) =>
    `/boards/${boardId}/lists/${listId}/cards/${cardId}`,

  // Board PATTERNS - for route definition (with :params)
  BOARD_PATTERN: '/boards/:boardId',
  CARD_PATTERN: '/boards/:boardId/lists/:listId/cards/:cardId',
} as const;
