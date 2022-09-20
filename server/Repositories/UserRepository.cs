using System;
using server.Data;
using server.Models;


namespace server.Repository
{
    public class UserRepository
    {
        private readonly UsersContext _context;
        public UserRepository(UsersContext context)
        {
            _context = context;
        }
        public void createUser(UsersModels user)
        {
            Console.WriteLine(user);
            try
            {
                _context.UsersModels.Add(user);
                _context.SaveChanges();
            }
            catch
            {
                Console.WriteLine("Error repo");
            }
            
        }
    }
}
