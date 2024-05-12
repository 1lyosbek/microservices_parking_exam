import { connectionSource } from "src/common/config/database.config";
import { hashed } from "src/lib/bcrypt";
import { UserDetailEntity } from "src/modules/user-detail/entities/user-detail.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { createConnection, DataSource } from "typeorm"



( async () => {
    const connection: DataSource = await createConnection(connectionSource);

    const queryRunner = connection.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

        ////////Creating User///////
        const userRepository = queryRunner.manager.getRepository(UserEntity);
        const users = await userRepository.find();
        await userRepository.remove(users);
        const newUser = new UserEntity();
        newUser.phone = "+998335701001";
        newUser.password = hashed("test");
        newUser.role = 'admin';
        await userRepository.save<UserEntity>(newUser);

        const newUser2 = new UserEntity();
        newUser2.phone = "+998335701002";
        newUser2.password = hashed("boss")
        newUser2.role = 'owner';
        await userRepository.save<UserEntity>(newUser2);

        ////////Creating UserDetail///////
        const userDetailRepository = queryRunner.manager.getRepository(UserDetailEntity);
        const userDetails = await userDetailRepository.find();
        await userDetailRepository.remove(userDetails);
        const newUserDetail = new UserDetailEntity();
        newUserDetail.userId = 1;
        newUserDetail.firstName = "Ilyosbek";
        newUserDetail.lastName = "Isaqov";
        newUserDetail.avatar = 1;
        await userDetailRepository.save<UserDetailEntity>(newUserDetail);
        await queryRunner.commitTransaction();
    } catch (err) {
        console.log("error", err);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
})();
