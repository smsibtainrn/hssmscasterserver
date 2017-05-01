/**
 * Created by Sibtain Raza on 5/1/2017.
 */
router.post("/addGroup", function (req, res) {
    var groupData = req.body;
    console.log(groupData);
    db_helper.createGroup(groupData).then(function (data) {
        // data.is_executed = true;
        console.log(data[0].group_id);
        res.send({is_executed:true,group_id:data[0].group_id});
    });
});