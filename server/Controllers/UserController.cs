using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly UsersContext _context;

        public UsersController(UsersContext context)
        {
            _context = context;
        }

        [HttpPost]
        public JsonResult CreateEdit(UsersModels user)
        {
            try
            {
                _context.UsersModels.Add(user);
                _context.SaveChanges();
                return new JsonResult(Ok(user));
            }
            catch
            {
                return new JsonResult(BadRequest());
            }
            
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            try
            {
                var result = _context.UsersModels.Find(id);
                return new JsonResult(Ok(result));
            }
            catch
            {
                return new JsonResult(NotFound());
            }
            
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            try
            {
                var result = _context.UsersModels.Find(id);
                if (result == null)
                {
                return new JsonResult(NotFound());
                }
                _context.UsersModels.Remove(result);
                _context.SaveChanges();
                return new JsonResult(NoContent());
            }
            catch
            {
                return new JsonResult(BadRequest());
            }
        }

        [HttpPut]
        public JsonResult Put(UsersModels user)
        {
            try
            {
                _context.UsersModels.Update(user);
                _context.SaveChanges();
                return new JsonResult(Ok(user));
            } 
            catch 
            {
                return new JsonResult(BadRequest());
            }
        }

        [HttpGet()]
        public JsonResult GetAll()
        {
            try
            {
                var result = _context.UsersModels.ToList();
                return new JsonResult(Ok(result));
            }
            catch
            {
                return new JsonResult(NotFound());
            }
            
        }
    }
}
