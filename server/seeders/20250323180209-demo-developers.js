'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query("ALTER TABLE developers AUTO_INCREMENT = 1");
    await queryInterface.sequelize.query("ALTER TABLE developers_details AUTO_INCREMENT = 1");
    await queryInterface.sequelize.query("ALTER TABLE developers_position AUTO_INCREMENT = 1");
    await queryInterface.sequelize.query("ALTER TABLE developers_images AUTO_INCREMENT = 1");
    
    await queryInterface.bulkInsert('developers', [
      {
        name: 'Papop',
        gender: 'Male',
        height: 170.0,
        birthdate: new Date('2005-01-21')
      },
      {
        name: 'Taiyou',
        gender: 'Male',
        height: 175.0,
        birthdate: new Date('2005-06-11')
      },
      {
        name: 'Astronaut0414',
        gender: 'Male',
        height: 180.0,
        birthdate: new Date('2004-07-31')
      },
      {
        name: 'Paw',
        gender: 'Female',
        height: 165.0,
        birthdate: new Date('2004-12-13')
      },
      {
        name: 'Libratul',
        gender: 'Male',
        height: 178.0,
        birthdate: new Date('2004-10-06')
      },
      {
        name: 'Clover',
        gender: 'Female',
        height: 166.0,
        birthdate: new Date('2006-10-25')
      },
      {
        name: 'PizzaMan',
        gender: 'Male',
        height: 180.0,
        birthdate: new Date('2006-02-22')
      },
      {
        name: 'Bonsai',
        gender: 'Male',
        height: 168.0,
        birthdate: new Date('2006-05-30')
      },
      {
        name: 'Papop-bot',
        gender: 'Male',
        height: 167.0,
        birthdate: new Date('2005-02-04')
      }
    ], {});

    const developers = await queryInterface.sequelize.query(
      `SELECT id, name from developers`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const devMap = {};
    developers.forEach(dev => {
      devMap[dev.name] = dev.id;
    });

    // Add seed data for developer details
    await queryInterface.bulkInsert('developers_details', [
      {
      devid: devMap['Papop'],
      likes: 'Sweets',
      dislikes: 'Ghost, Snakes',
      personality: 'Kind, Good-natured, Cheerful',
      generation: 1
      },
      {
      devid: devMap['Taiyou'],
      likes: 'Survival, Sandbox Games',
      dislikes: 'Papop',
      personality: 'Cheerful, Playful, Cute',
      generation: 1
      },
      {
      devid: devMap['Astronaut0414'],
      likes: 'Playing',
      dislikes: 'Studying',
      personality: 'Bossy, Mature, Scary, Active, Energetic',
      generation: 2
      },
      {
      devid: devMap['Paw'],
      likes: 'Dolls, Ice-cream, Shark',
      dislikes: 'Rude words, Vegetables',
      personality: 'Joyful, Cute, Genial, Sensitive',
      generation: 1
      },
      {
      devid: devMap['Libratul'],
      likes: 'Aquarium, Squid, Souls-like Games',
      dislikes: 'Deep Water',
      personality: 'Quiet, Polite, Cold-hearted',
      generation: 2
      },
      {
      devid: devMap['Clover'],
      likes: 'Singing, Playing Games, Arguing with Papop, You',
      dislikes: 'Homeworks',
      personality: 'Lazy (But determined), Talkative',
      generation: 3
      },
      {
      devid: devMap['PizzaMan'],
      likes: 'Music and Sports',
      dislikes: 'Books',
      personality: 'Crazy and Clumsy',
      generation: 1
      },
      {
      devid: devMap['Bonsai'],
      likes: 'Trees',
      dislikes: 'Pineapple',
      personality: 'Friendly and Talkative',
      generation: 3
      },
      {
      devid: devMap['Papop-bot'],
      likes: 'Helping Papop',
      dislikes: 'Errors',
      personality: 'Helpful, Efficient, Friendly',
      generation: 1
      }
    ], {});

    // Add positions
    await queryInterface.bulkInsert('developers_position', [
      {
        devid: devMap['Papop'],
        position: 'CEO'
      },
      {
        devid: devMap['Taiyou'],
        position: 'Content Creator'
      },
      {
        devid: devMap['Astronaut0414'],
        position: 'Content Creator'
      },
      {
        devid: devMap['Paw'],
        position: 'Advisor'
      },
      {
        devid: devMap['Libratul'],
        position: 'Illustrator'
      },
      {
        devid: devMap['Clover'],
        position: 'Advisor'
      },
      {
        devid: devMap['PizzaMan'],
        position: 'Technology Support'
      },
      {
        devid: devMap['Bonsai'],
        position: 'Technology Support'
      },
      {
        devid: devMap['Papop-bot'],
        position: 'Virtual Classmate'
      }
    ], {});

    // Developers Image
    await queryInterface.bulkInsert('developers_images', [
      {
        devid: devMap['Papop'],
        devsticker1: '/images/developers/papop/devsticker1.png',
        devsticker2: '/images/developers/papop/devsticker2.png',
        devsticker3: '/images/developers/papop/devsticker3.png',
        mouthopen: '/images/developers/papop/mouthopen.png',
        image: '/images/developers/papop/image.png',
        profileWafer: '/images/developers/papop/profileWafer.png',
        profile: '/images/developers/papop/profile.png'
      },
      {
        devid: devMap['Taiyou'],
        devsticker1: '/images/developers/taiyou/devsticker1.png',
        devsticker2: '/images/developers/taiyou/devsticker2.png',
        devsticker3: '/images/developers/taiyou/devsticker3.png',
        mouthopen: '/images/developers/taiyou/mouthopen.png',
        image: '/images/developers/taiyou/image.png',
        profileWafer: '/images/developers/taiyou/profileWafer.png',
        profile: '/images/developers/taiyou/profile.png'
      },
      {
        devid: devMap['Astronaut0414'],
        devsticker1: '/images/developers/astronaut0414/devsticker1.png',
        devsticker2: '/images/developers/astronaut0414/devsticker2.png',
        devsticker3: '/images/developers/astronaut0414/devsticker3.png',
        mouthopen: '/images/developers/astronaut0414/mouthopen.png',
        image: '/images/developers/astronaut0414/image.png',
        profileWafer: '/images/developers/astronaut0414/profileWafer.png',
        profile: '/images/developers/astronaut0414/profile.png'
      },
      {
        devid: devMap['Paw'],
        devsticker1: '/images/developers/paw/devsticker1.png',
        devsticker2: '/images/developers/paw/devsticker2.png',
        devsticker3: '/images/developers/paw/devsticker3.png',
        mouthopen: '/images/developers/paw/mouthopen.png',
        image: '/images/developers/paw/image.png',
        profileWafer: '/images/developers/paw/profileWafer.png',
        profile: '/images/developers/paw/profile.png'
      },
      {
        devid: devMap['Libratul'],
        devsticker1: '/images/developers/libratul/devsticker1.png',
        devsticker2: '/images/developers/libratul/devsticker2.png',
        devsticker3: '/images/developers/libratul/devsticker3.png',
        mouthopen: '/images/developers/libratul/mouthopen.png',
        image: '/images/developers/libratul/image.png',
        profileWafer: '/images/developers/libratul/profileWafer.png',
        profile: '/images/developers/libratul/profile.png'
      },
      {
        devid: devMap['Clover'],
        devsticker1: '/images/developers/clover/devsticker1.png',
        devsticker2: '/images/developers/clover/devsticker2.png',
        devsticker3: '/images/developers/clover/devsticker3.png',
        mouthopen: '/images/developers/clover/mouthopen.png',
        image: '/images/developers/clover/image.png',
        profileWafer: '/images/developers/clover/profileWafer.png',
        profile: '/images/developers/clover/profile.png'
      },
      {
        devid: devMap['PizzaMan'],
        devsticker1: '/images/developers/pizzaman/devsticker1.png',
        devsticker2: '/images/developers/pizzaman/devsticker2.png',
        devsticker3: '/images/developers/pizzaman/devsticker3.png',
        mouthopen: '/images/developers/pizzaman/mouthopen.png',
        image: '/images/developers/pizzaman/image.png',
        profileWafer: '/images/developers/pizzaman/profileWafer.png',
        profile: '/images/developers/pizzaman/profile.png'
      },
      {
        devid: devMap['Bonsai'],
        devsticker1: '/images/developers/bonsai/devsticker1.png',
        devsticker2: '/images/developers/bonsai/devsticker2.png',
        devsticker3: '/images/developers/bonsai/devsticker3.png',
        mouthopen: '/images/developers/bonsai/mouthopen.png',
        image: '/images/developers/bonsai/image.png',
        profileWafer: '/images/developers/bonsai/profileWafer.png',
        profile: '/images/developers/bonsai/profile.png'
      },
      {
        devid: devMap['Papop-bot'],
        devsticker1: '/images/developers/papopbot/devsticker1.png',
        devsticker2: '/images/developers/papopbot/devsticker2.png',
        devsticker3: '/images/developers/papopbot/devsticker3.png',
        mouthopen: '/images/developers/papopbot/mouthopen.png',
        image: '/images/developers/papopbot/image.png',
        profileWafer: '/images/developers/papopbot/profileWafer.png',
        profile: '/images/developers/papopbot/profile.png'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove seed data
    await queryInterface.bulkDelete('developers_images', null, {});
    await queryInterface.bulkDelete('developers_position', null, {});
    await queryInterface.bulkDelete('developers_details', null, {});
    await queryInterface.bulkDelete('developers', null, {});
  }
};