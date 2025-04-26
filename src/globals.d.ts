export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      isAdmin: boolean;
    }
  }

  interface UserPublicMetadata {
    isAdmin?: boolean;
  }
}