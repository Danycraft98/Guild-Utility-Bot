module.exports = async (client, profile) => {
    try {
        const newProfile = {
            userID: profile.id,
            username: profile.name,
        };
    
        await client.createProfile(newProfile);
    } catch (error) {
        console.error(error);
    }

};