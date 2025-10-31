export const teacherTypeDefs = `#graphql
  type Teacher {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
    email: String!
    phone: String
    bio: String
    photoUrl: String
    specialties: [String!]
    certifications: [Certification!]
    schedule: [Schedule!]
    experience: Int
    isActive: Boolean!
    socialMedia: SocialMedia
    createdAt: String!
    updatedAt: String!
  }

  type Certification {
    name: String
    institution: String
    year: Int
  }

  type Schedule {
    day: String
    startTime: String
    endTime: String
    location: String
    ageGroup: String
    discipline: String
  }

  type SocialMedia {
    instagram: String
    facebook: String
    twitter: String
  }

  input CertificationInput {
    name: String
    institution: String
    year: Int
  }

  input ScheduleInput {
    day: String
    startTime: String
    endTime: String
    location: String
    ageGroup: String
    discipline: String
  }

  input SocialMediaInput {
    instagram: String
    facebook: String
    twitter: String
  }

  input CreateTeacherInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    bio: String
    photoUrl: String
    specialties: [String!]
    certifications: [CertificationInput!]
    schedule: [ScheduleInput!]
    experience: Int
    isActive: Boolean
    socialMedia: SocialMediaInput
  }

  input UpdateTeacherInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    bio: String
    photoUrl: String
    specialties: [String!]
    certifications: [CertificationInput!]
    schedule: [ScheduleInput!]
    experience: Int
    isActive: Boolean
    socialMedia: SocialMediaInput
  }

  type Query {
    teachers(isActive: Boolean): [Teacher!]!
    teacher(id: ID!): Teacher
    teachersBySpecialty(specialty: String!): [Teacher!]!
  }

  type Mutation {
    createTeacher(input: CreateTeacherInput!): Teacher!
    updateTeacher(id: ID!, input: UpdateTeacherInput!): Teacher!
    deleteTeacher(id: ID!): Boolean!
  }
`;
