import isArray from 'lodash/isArray'

/**searchs through all arrays of the tree if the for a value from a property
 * @param aTree : the tree array
 * @param fCompair : This function will receive each node. It's upon you to define which 
                     condition is necessary for the match. It must return true if the condition is matched. Example:
                        function(oNode){ if(oNode["Name"] === "AA") return true; }
 * @param bGreedy? : us true to do not stop after the first match, default is false
 * @return an array with references to the nodes for which fCompair was true; In case no node was found an empty array
 *         will be returned
*/
export default function searchTree(aTree, childKey, fCompair, bGreedy) {
    let aInnerTree = [ aTree ]; // will contain the inner children
    let oNode; // always the current node
    const aReturnNodes = []; // the nodes array which will returned

    // 1. loop through all root nodes so we don't touch the tree structure
    aInnerTree = aInnerTree.concat(aTree[ childKey ]);

    while (aInnerTree.length > 0) {
        oNode = aInnerTree.pop();
        // check current node
        if (fCompair(oNode)) {
            aReturnNodes.push(oNode);
            if (!bGreedy) {
                return aReturnNodes;
            }
        } else { // if (node.children && node.children.length) {
            if(oNode[ childKey ])
                for (let i = 0; i < oNode[ childKey ].length; i++) {
                    aInnerTree.push(oNode[ childKey ][ i ]);
                }
        }
    }
    return aReturnNodes; // someone was greedy
}