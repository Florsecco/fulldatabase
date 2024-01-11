module.exports = (sequelize, dataTypes) => {
    let alias = 'ActorMovie';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        actor_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            references: {
                model: 'Actor',
                key: 'id',
            }
        },
        movie_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            references: {
                model: 'Movie',
                key: 'id',
            }
        },

    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const ActorMovie = sequelize.define(alias, cols, config); 

    ActorMovie.associate = (models)=>{
        ActorMovie.belongsTo(models.Actor, { foreignKey: 'actor_id' })
        ActorMovie.belongsTo(models.Movie, { foreignKey: 'movie_id' })
    }
    
    return ActorMovie
};