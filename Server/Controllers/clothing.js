"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessAddPage = exports.ProcessEditPage = exports.DisplayAddPage = exports.DisplayEditPage = exports.DisplayClothingListPage = void 0;
const clothing_1 = __importDefault(require("../Models/clothing"));
const Util_1 = require("../Util");
function DisplayClothingListPage(req, res, next) {
    clothing_1.default.find((err, clothingCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Business Contact List', page: 'contact-list', clothing: clothingCollection, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayClothingListPage = DisplayClothingListPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    clothing_1.default.findById(id, {}, {}, (err, clothingItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'update', clothing: clothingItemToEdit, displayName: Util_1.UserDisplayName(req) });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'update', clothing: '', displayName: Util_1.UserDisplayName(req) });
}
exports.DisplayAddPage = DisplayAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedClothingItem = new clothing_1.default({
        "_id": id,
        "FullName": req.body.FullName,
        "EmailAddress": req.body.EmailAddress,
        "ContactNumber": req.body.ContactNumber,
    });
    clothing_1.default.updateOne({ _id: id }, updatedClothingItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessAddPage(req, res, next) {
    let newContact = new clothing_1.default({
        "FullName": req.body.FullName,
        "EmailAddress": req.body.EmailAddress,
        "ContactNumber": req.body.ContactNumber,
    });
    clothing_1.default.create(newContact, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    clothing_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
//# sourceMappingURL=clothing.js.map