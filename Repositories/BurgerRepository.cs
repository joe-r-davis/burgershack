using System.Collections.Generic;
using System.Data;
using burger_shack.Models;
using Microsoft.AspNetCore.Mvc;
using Dapper;

namespace burger_shack.Repositories
{
    public class BurgerRepository
    {

        private readonly IDbConnection _db;

        public BurgerRepository(IDbConnection db)
        {
            _db = db;
        }

        //CREATEONE
        public Burger Add(Burger burger)
        {
            int id = _db.ExecuteScalar<int>($@"
      INSERT INTO burgers (
        name,
        description,
        price,
        kcal
      ) VALUES (@Name, @Description, @Price, @KCal)", burger);
            burger.Id = id;
            return burger;
        }

        //READ: FINDONE FINDALL FINDMANY
        public Burger GetById(int id)
        {
            return _db.QueryFirstOrDefault<Burger>(@"
        SELECT * FROM burgers WHERE id = @id
      ", new { id = id });
        }

        public IEnumerable<Burger> GetBurgers()
        {
            return _db.Query<Burger>("SELECT * FROM burgers");
        }

        public IEnumerable<UserBurgerOrderReport> GetUserBurgerReport(string userId)
        {

            return _db.Query<UserBurgerOrderReport>(@"
        SELECT
          u.name username,
          u.email,
          ob.burgerId,
          ob.quantity,
          ob.orderId,
          b.name burger,
          b.kcal
        FROM orderburgers ob
        JOIN users u ON u.id = ob.userId
        JOIN burgers b ON b.id = ob.burgerId
        WHERE userId = @id;
      ", new { id = userId });

        }

        public Burger Update(int id, Burger burger)
        {
            Burger updated = _db.QueryFirstOrDefault<Burger>(@"
            UPDATE burgers SET
            name = @Name,
            description = @Description,
            price = @Price,
            kcal = @KCal
            WHERE id = @id;
            SELECT * FROM Burgers WHERE id = @id;", burger);
            return updated;
        }

        public string FindByIdAndRemove(int id)
        {
            _db.Execute(@"
        DELETE FROM burgers WHERE id = @id
      ", new { id = id });
            return "successful deletion";
        }

    }
}