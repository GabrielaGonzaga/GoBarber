import UserToken from "../infra/typeorm/entities/UserToken";

interface IUserTokenRepository{
    generate(user_id: string): Promise<UserToken>
}

export default IUserTokenRepository;