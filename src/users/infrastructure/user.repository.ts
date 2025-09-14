// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../domain/user.entity';
// import { UserRepository } from '../domain/user.repository';
// import { Repository } from 'typeorm';
// import { UserSchema } from './user.schema';
// import { UserMapper } from './mapper/user.mapper';
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class UserRepositoryImpl implements UserRepository {
//   constructor(
//     @InjectRepository(UserSchema)
//     private readonly userRepository: Repository<UserSchema>,
//   ) {}
//   create(entity: Partial<User>): Promise<User> {
//     throw new Error('Method not implemented.');
//   }

//   async findByUserEmail(email: string): Promise<User> {
//     const user = await this.userRepository.findOne({
//       where: { email },
//       relations: ['roles', 'roles.permissions'],
//     });

//     return UserMapper.instance.toEntity(user);
//   }

//   findAll(): Promise<User[]> {
//     throw new Error('Method not implemented.');
//   }

//   async findById(id: string): Promise<User> {
//     const user = await this.userRepository.findOneBy({
//       id,
//     });
//     return UserMapper.instance.toEntity(user);
//   }

//   async 11(entity: User): Promise<User> {
//     const userSchema = UserMapper.instance.toSchema(entity);

//     const user = await this.userRepository.save(userSchema);
//     return UserMapper.instance.toEntity(user);
//   }

//   update(entity: User): Promise<User> {
//     // const user = await this.userRepository.save(entity);
//     // return user;
//     return null;
//   }

//   softDeleteById(id: string): Promise<void> {
//     // await this.userRepository.softDelete({ id });
//     return null;
//   }
// }
