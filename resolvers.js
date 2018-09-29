import teamMembers from './team-members.json';

export const resolvers = {
  Query: {
    teamMembers: (root, args) => {
      return teamMembers;
    }
  }
};