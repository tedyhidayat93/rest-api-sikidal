var pool = require('./dbCon').pool;


const create = (request, response) => {
    // const created_at = new Date;
    const params = request.body
    // console.log(params.mmsi)
    //cek duplikat mmsi kapal
    pool.query('SELECT * FROM tbl_kapal where mmsi=?', [params.mmsi], (error, results) => {
        console.log(results)

        if (error) {
            throw error
        } else {

            if(results.length > 0) {
                response.status(400).send({
                    success: false,
                    message: "kapal sudah ada !"
                }); 
            } else { 
                console.log('ok'); 
                let name = 'default.jpg'
                // let complete_path = base_url + 'dokumens/user/' + name
                if (request.files) {
                    let namafile = request.files.foto_kapal.name;

                    const tgl = Date.now()
                    name = tgl + '-' + namafile.replace(/\s+/g, '')

                    // sampleFile.mv(path.join(__dirname + '/dokumens/user/') + name, function (err) {
                    //     if (err)
                    //         console.log(err);
                    // });
                }

                // pool.query('INSERT INTO tbl_kapal SET ?', params, (error, results) => {
                //     if (error) {
                //         throw error
                //         response.status(201).send(error)
                //         if (error.code == '23505') {
                //             response.status(400).send('Duplicate data')
                //             return;
                //         }
                //     } 
                //     response.status(200).send({ 
                //         success: true,
                //         item: params.nama_kapal,
                //         data: 'Data kapal berhasil dibuat.'
                //     });
                // })
                
            }
            
        }
    });


}

const read = (request, response) => {
    pool.query('SELECT count(*) as total FROM tbl_kapal where is_delete=0', (error, results) => {
        if (error) {
            throw error
        }
        var total = results[0].total;
        pool.query('SELECT * FROM tbl_kapal where is_delete=0', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send({ 
                success: true, 
                total: total,
                data: results, 
            });
        });
    });
}

const read_by_id = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT count(*) as total FROM tbl_kapal where is_delete=0 and id = ?', [id], (error, results) => {
        if (error) {
            throw error
        }
        var total = results[0].total;
        pool.query('SELECT * FROM tbl_kapal where is_delete=0 and id = ?', [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send({ 
                success: true, 
                total: total,
                data: results, 
            });
        });
    });

}
  
const update = (request, response) => {
    const id = parseInt(request.params.id);
    const { nama_kapal, callsign, mmsi, imo, gt, flag, jenis_kapal, foto_kapal, updated_by } = request.body
    const updated_at= new Date;
    pool.query('SELECT count(*) as total FROM tbl_kapal where id = ? and is_delete = ?', [id, 0], (error, results) => {
        if (error) {
            throw error
        } else {
            pool.query('UPDATE tbl_kapal SET nama_kapal=?, callsign=?, mmsi=?, imo=?, gt=?, flag=?, jenis_kapal=?, foto_kapal=?, updated_at=?, updated_by=? where id=?'
                , [nama_kapal, callsign, mmsi, imo, gt, flag, jenis_kapal, foto_kapal, updated_at, updated_by, id], (error, results) => {
                if (error) {
                    if (error.code == '23505') {
                        response.status(400).send('Duplicate data');
                        return;
                    }
                } else {
                    response.status(200).send({ success: true, data: 'data kapal berhasil diupdate' });
                }
            });
        }
    });
}

const soft_delete = (request, response) => {
    const id = parseInt(request.params.id);
    const {deleted_by} = request.body
    const deleted_at= new Date;
    console.log(deleted_by);
    pool.query('UPDATE tbl_kapal SET deleted_at=?, is_delete=?, deleted_by=? where id=?'
        , [deleted_at, 1, deleted_by, id], (error, results) => {
        if (error) {
            if (error.code == '23505') {
                response.status(400).send('Duplicate data');
                return;
            }
        } else {
            response.status(200).send({ success: true, data: 'data kapal berhasil dihapus' });
        }
    });
}


module.exports = {
    create,
    read,
    read_by_id,
    update,
    soft_delete
}
