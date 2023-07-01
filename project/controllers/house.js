var houses = require('../model/house')

module.exports.getHouse = id => {
    return houses.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addHouse = l => {
    return houses.create(l)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addCommentHouse = (id, com) => {
    return houses.updateOne({_id:id}, 
                { $push: { "desc": com } })
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteCommentHouse = (id, com) => {
    return houses.updateOne({ "_id": id }, 
                { $pull: {"desc": {_id: com}}})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteHouse = id => {
    return houses.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateHouse = (idRute,house,values) => {
    return houses.updateOne({_id:house},
        {enfiteuta:values.enfiteuta,
         foro:values.foro})
         .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getComment = (id, com) => {
    return houses.findOne({_id:id})
            .then(resposta => {
                console.log(resposta.desc.find(c => c._id == com))
                return resposta.desc.find(c => c._id == com)
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateComment = (id,idCom,com) => {
    return houses.findOneAndUpdate({_id:id,"desc": {
        "$elemMatch": { "_id": idCom }
      }},
        {
            $set: {
                "desc.$.text": com.text,
                "desc.$.lugar": com.lugar,
                "desc.$.data": com.data,
                "desc.$.entidade": com.entidade
              }
        }
        ).then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
    }