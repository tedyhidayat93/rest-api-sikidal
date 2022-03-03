var pool = require('./dbCon').pool;


const create = (request, response) => {
    const params = request.body
    // const created_at = new Date;
    pool.query('INSERT INTO tbl_jenis_keadaan_darurat SET ?', params, (error, results) => {
        if (error) {
            throw error
            response.status(201).send(error)
            if (error.code == '23505') {
                response.status(400).send('Duplicate data')
                return;
            }
        } 
        response.status(200).send({ 
            success: true,
            item: params.jenis_keadaan_darurat,
            data: 'Data jenis_keadaan_darurat berhasil dibuat.'
        });
    })
}

const read = (request, response) => {
    pool.query('SELECT count(*) as total FROM tbl_jenis_keadaan_darurat where is_delete=0', (error, results) => {
        if (error) {
            throw error
        }
        var total = results[0].total;
        pool.query('SELECT * FROM tbl_jenis_keadaan_darurat where is_delete=0', (error, results) => {
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
    pool.query('SELECT count(*) as total FROM tbl_jenis_keadaan_darurat where is_delete=0 and id = ?', [id], (error, results) => {
        if (error) {
            throw error
        }
        var total = results[0].total;
        pool.query('SELECT * FROM tbl_jenis_keadaan_darurat where is_delete=0 and id = ?', [id], (error, results) => {
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
    const { nama_jenis_keadaan_darurat, updated_by } = request.body
    const updated_at= new Date;
    pool.query('SELECT count(*) as total FROM tbl_jenis_keadaan_darurat where id = ? and is_delete = ?', [id, 0], (error, results) => {
        if (error) {
            throw error
        } else {
            pool.query('UPDATE tbl_jenis_keadaan_darurat SET nama_jenis_keadaan_darurat=?, updated_at=?, updated_by=? where id=?'
                , [nama_keadaan_darurat, updated_at, updated_by, id], (error, results) => {
                if (error) {
                    if (error.code == '23505') {
                        response.status(400).send('Duplicate data');
                        return;
                    }
                } else {
                    response.status(200).send({ success: true, data: 'data jenis_keadaan_darurat berhasil diupdate' });
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
    pool.query('UPDATE tbl_jenis_keadaan_darurat SET deleted_at=?, is_delete=?, deleted_by=? where id=?'
        , [deleted_at, 1, deleted_by, id], (error, results) => {
        if (error) {
            if (error.code == '23505') {
                response.status(400).send('Duplicate data');
                return;
            }
        } else {
            response.status(200).send({ success: true, data: 'data jenis_keadaan_darurat berhasil dihapus' });
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