using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Data 
{
    public class UsersContext : DbContext
    {
        public DbSet<UsersModels> UsersModels { get; set; }
        public UsersContext(DbContextOptions<UsersContext> options)
        :base(options)
        {

        }
    };
};