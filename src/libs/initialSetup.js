import Role from '../models/role.model';

export const createRoles = async () => {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
        new Role({
            name: 'User'
        }).save(),
    
        new Role({
            name: 'Moderator'
        }).save(),

        new Role({
            name: 'Administrator'
        }).save()
    ]);

    console.log(values);
    console.log("Roles created!");
}