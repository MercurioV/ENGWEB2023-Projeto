var streets = require('../model/rute')

// Streets list
module.exports.list = (limitValue,skipValue) => {
    return streets
            .find()
            .limit(limitValue)
            .skip(skipValue)
            .sort({_id:-1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

// Streets list
module.exports.filteredList = (filter,values) => {
    switch (filter) {
        case 'lugar':
            return streets
            .find({'comments.lugar': { $in: values } })
            .sort({_id:-1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
          break;
        case 'data':
            return streets
            .find({'comments.data': { $in: values } })
            .sort({_id:-1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
            break
        case 'entidade':
            return streets
            .find({'comments.entidade': { $in: values } })
            .sort({_id:-1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
          break;
        default:
          console.log(`Sorry, filter not valid ${filter}.`);
      }
}

module.exports.findRute = name => {
    return streets.findOne({nome:name})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getRute = id => {
    return streets.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addRute = l => {
    return streets.create(l)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateRute = l => {
    return streets.updateOne({_id:l._id}, l)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteRute = id => {
    return streets.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getComment = (id, com) => {
    return streets.findOne({_id:id})
            .then(resposta => {
                console.log(resposta.comments.find(c => c._id == com))
                return resposta.comments.find(c => c._id == com)
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addComment = (id, com) => {
    return streets.updateOne({_id:id}, 
                { $push: { "comments": com } })
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteComment = (id, com) => {
    return streets.updateOne({ "_id": id }, 
                { $pull: {"comments": {_id: com}}})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addHouse = (id, house) => {
    return streets.updateOne({_id:id}, 
                { $push: { "listaCasas": house } })
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addPhoto = (id, photo) => {
    return streets.updateOne({_id:id}, 
                { $push: { "figura": photo } })
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteHouse = (id, house) => {
    return streets.updateOne({ "_id": id }, 
                { $pull: {"listaCasas": {_id:house}}})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateComment = (id,idCom,com) => {
    return streets.findOneAndUpdate({_id:id,"comments": {
        "$elemMatch": { "_id": idCom }
      }},
        {
            $set: {
                "comments.$.text": com.text,
                "comments.$.lugar": com.lugar,
                "comments.$.data": com.data,
                "comments.$.entidade": com.entidade
              }
        }
        ).then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
    }